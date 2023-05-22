import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
    const adjectives = [
        "Jak",
        "Grafički",
        "Istinit",
        "Energičan",
        "Bečki",
        "Brkati",
        "Javni",
        "Nizak",
        "Lud",
        "Nepozvan",
        "Pravi",
        "Snažan",
        "Sposoban",
        "Oštar",
        "Čvrst",
        "Vojnički",
        "Sladak",
        "Super",
    ];
    const nouns = [
        "Superman",
        "Batman",
        "Hulk",
        "Thor",
        "Pantera",
        "Stolar",
        "Zidar",
        "Keramičar",
        "Fotograf",
        "Mljekar",
        "Dimnjačar",
        "Sokol",
        "Paun",
        "Mačak",
        "Slatkiš",
        "Žohar",
        "Pjevač",
        "Klavijaturist",
        "Ronioc",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomName = adjective + " " + noun;
    return randomName;
}

class App extends Component {
    state = {
        messages: [],
        member: {
            username: randomName(),
        },
    };

    constructor() {
        super();
        this.drone = new window.Scaledrone("DSc9mTj4PFeKYq5X", {
            data: this.state.member,
        });
        this.drone.on("open", (error) => {
            if (error) {
                return console.error(error);
            }
            const member = { ...this.state.member };
            member.id = this.drone.clientId;
            this.setState({ member });
        });
        const room = this.drone.subscribe("observable-room");
        room.on("data", (data, member) => {
            const messages = this.state.messages;
            messages.push({ member, text: data });
            this.setState({ messages });
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Pejić - Chat Aplikacija</h1>
                </div>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input onSendMessage={this.onSendMessage} />
            </div>
        );
    }

    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message,
        });
    };
}

export default App;
