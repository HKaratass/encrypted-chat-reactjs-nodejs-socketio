import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AwesomeIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    margin-left: 6px;
    color: #f2f2f2;
    &:hover {
        color: white;
    }
`;

export const BackGround = styled.div`
    background-color: #343434;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
`;


export const Middle = styled.div`
    max-width: 1080px;
    margin: 0 auto 0 auto;
    background-color: #454545;
`;

export const MessagesWraper = styled.div`
    height: calc(100dvh - 2.5em);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: safe end;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 3.5px;
        height: 7px;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: #8b8b8b;
        border-radius: 10px;

        &:hover {
            background: aliceblue;
        }
    }


`;

interface MesseageI {
    $recieve?: boolean
    $qr?: boolean
}
export const Messeage = styled.div<MesseageI>`
    background-color: ${(props) => props.$recieve ? `#363636` : `#005c4b`};
    color: #f2f2f2;
    padding: 10px;
    max-width: 70%;
    min-width: 20%;
    margin: ${(props) => props.$recieve ? `5px auto 0 5px` : `5px 5px 0 auto`};
    padding: 10px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$recieve && props.$qr) ? "end" : ""};
    ${MessagesWraper} &:last-child {
        margin-bottom: 5px
    }

`;
export const Info = styled.div`
    background-color: #54545488;
    color: #c2c2c2;
    margin: 5px auto;
    max-width: 50%;
    min-width: 20%;
    padding: 6px;
    text-align: center;
    border-radius: 6px;
    user-select: ${() => { //clipboard için
        return (import.meta.env.VITE_SOCKET_URL.substring(0, 5) === "https" || 
            import.meta.env.VITE_SOCKET_URL.substring(0, 16) === "http://localhost") 
            ? "none" : "initial"}};
`;

export const BottomWraper = styled.div`
    display: flex;
    height: 2.5em;
    background-color: #2c2c2c;
    width: 100%;
    padding: (1dvw + 1dvh);
    justify-content: center;
    align-items: center;
`;

export const WriteMessage = styled.input`
    height: 2.5em;
    background-color: transparent;
    width: calc(100% - (2dvw + 2dvh));
    border: none;
    outline: none;
    font-size: 1.2em;
    padding: 0 12px;
    color: #f2f2f2;

`;

export const SubmitButton = styled.button`
    background-color: transparent;
    color: #f2f2f2;
    height: 1.5em;
    width: 1.5em;
    border-radius: 1.5em;
    text-align: center;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 10px;
    font-size: 1.5em;
    transition: background-color 1s, transform 0.4s;
    &:hover {
        background-color: #199134;

    }
    &:active {
        transform: scale(0.8);

    }
`;

