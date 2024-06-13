import { Component } from "react";
import AuthService from "../services/auth.service";

type Props = {};

const communityBaseUrl = "https://event-quest-anmdgtus.bettermode.io";
const jwtUrl = "/api/auth/sso?jwt=";

type State = {
    url: string | undefined;
}

export default class Community extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            url: communityBaseUrl
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser);
        if (currentUser)
            this.setState({ url: communityBaseUrl + jwtUrl + currentUser.accessToken });
    }

    render() {
        return (
            <iframe
                src={this.state.url}
                frameBorder="0"
                width="100%"
                style={{
                    position: "absolute",
                    height: "100%",
                    border: "none"
                }}
            />
        );
    }
}
