import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

function ChatPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <NavBar />
            <Chat />
        </div>
    );
}

export default ChatPage;
