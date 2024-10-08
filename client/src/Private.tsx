import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import CryptoJS from "crypto-js";
import { AwesomeIcon, BackGround, BottomWraper, Info, MessagesWraper, Messeage, Middle, SubmitButton, WriteMessage } from './style/Chat.styled';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPaperPlane, faQrcode } from "@fortawesome/free-solid-svg-icons";
import QRCode from 'qrcode'

const socket: Socket = io(import.meta.env.VITE_SOCKET_URL);


const Private: React.FC = () => {
    interface socketMessageI {
        sender: string,
        message: string,
    }
    interface messageI {
        message: string,
        recieve?: boolean
        info?: boolean
        qr?: boolean
    }
    interface targetI {
        id: string,
        cryptoKey: string,

    }
    const [messages, setMessages] = useState<messageI[]>([]);
    const [input, setInput] = useState<string>('');
    const [target, setTarget] = useState<targetI>({
        id: '',
        cryptoKey: '-1'
    });

    const encryptMessage = (message: string, secretKey: string): string => {
        const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
        return ciphertext;
    };
    interface decryptMessageI {
        originalMessage: string,
        state?: boolean
    }
    const decryptMessage = (ciphertext: string, secretKey: string, sender: string): decryptMessageI => {
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
            const originalMessage = bytes.toString(CryptoJS.enc.Utf8);

            if (!originalMessage) {
                throw new Error("Çözme başarısız. Mesaj boş döndü.");
            }

            return { originalMessage, state: true };
        } catch (error: any) {
            console.error("ERR", error.message);
            socket.emit('check', { returnId: sender, decryptionErr: true });
            return { originalMessage: "Mesaj çözümlenemedi. Anahtar kelime uyuşmuyor.", state: false };
        }
    };

    const qrCodeId = async (id: string, target?: boolean) => {
        const qr = await QRCode.toDataURL(id,
            {
                errorCorrectionLevel: 'H', margin: 1,
                color: {
                    dark: "#081c38",
                    light: "#ffffff",
                },
                width: 200,
            }
        );
        setMessages((prev) => [...prev, { message: qr, qr: true, recieve: target }]);
    }

    const [id, setId] = useState<string | undefined>('');
    useEffect(() => {
        const key = prompt("Anahtar Kelimeyi Girin") || "";
        setTarget({ ...target, cryptoKey: key });
        socket.on('connect', () => {
            setId(socket.id);
        });
    }, []);


    useEffect(() => {
        socket.on('private message', (socketMessage: socketMessageI) => {
            if (socketMessage.sender === target.id) {
                const Message = decryptMessage(socketMessage.message, target.cryptoKey, socketMessage.sender);
                setMessages((prev) => [...prev, { message: Message.originalMessage, recieve: true, info: !Message.state }]);
            } else if (socketMessage.sender === socket.id) {
                setMessages((prev) => [...prev, { message: socketMessage.message, info: true }]);
            } else {
                socket.emit('check', { returnId: socketMessage.sender, connectionErr: true });
            }
        });
        return () => {
            socket.off('private message');
        };
    }, [target]);

    useEffect(() => {
        if ((document.getElementById("mw")?.scrollHeight || 1) > (document.getElementById("mw")?.clientHeight || 0))
            document.getElementById("mw")?.scrollTo(0, document.getElementById("mw")?.scrollHeight || 0);

    }, [messages]);

    const sendMessage = () => {
        if (!target.id) {
            if (input.length !== 20) {
                setMessages((prev) => [...prev, { message: "ID'ler 20 karakterlidir.", info: true }]);
            } else {
                setTarget({ ...target, id: input })
                setInput('');
            }
        }
        else {
            if (input) {
                const eMes = encryptMessage(input, target.cryptoKey);
                socket.emit('private message', { targetId: target.id, message: eMes }); // Mesajı sunucuya gönder
                setMessages((b) => [...b, { message: input }]);
                setInput('');
            }
        }

    };


    return (
        <BackGround>
            <Middle>
                <MessagesWraper id='mw'>
                    {
                        socket.id &&
                        <Info>
                            ID: {id}
                            <AwesomeIcon onClick={() => { navigator.clipboard.writeText(`${id}`) }} icon={faCopy} />
                            <AwesomeIcon onClick={() => { socket.id && qrCodeId(socket.id) }} icon={faQrcode} />
                        </Info>
                    }
                    {
                        target.id &&
                        <Info>
                            Bağlantı ID: {target.id}
                            <AwesomeIcon onClick={() => { navigator.clipboard.writeText(`${target.id}`) }} icon={faCopy} />
                            <AwesomeIcon onClick={() => { qrCodeId(target.id, true) }} icon={faQrcode} />
                        </Info>
                    }
                    {messages.map((k, i) => (
                        k.info ? <Info key={i}>{k.message}</Info> : (
                            k.qr ? <Messeage key={i} $qr={true} $recieve={k.recieve}><img src={k.message} alt='qr' /></Messeage> :
                                <Messeage $recieve={k.recieve} key={i}>{k.message}</Messeage>)
                    ))}
                </MessagesWraper>
                <BottomWraper>
                    <WriteMessage
                        maxLength={target.id ? 10000 : 20}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
                        placeholder={target.id ? "Bir mesaj yazın" : "Bağlantı Kurulacak ID"}
                    />
                    <SubmitButton onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></SubmitButton>
                </BottomWraper>
            </Middle>
        </BackGround>
    );
}

export default Private;
