import {Component} from "react";

class ErrorBoundary extends Component {
    state = {
        error: null,
    };
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        const { error } = this.state;
        INSTANCE = this;

        if (error) {
            return (
                <div>
                    <p>Seems like an error occured!</p>
                    <p>{error.message}</p>
                    <button onClick={()=>{window.location = '/'}}>RETURN</button>
                </div>
            );
        }
        return this.props.children;
    }
}

let INSTANCE = null;
export function showError(error){
    INSTANCE?.setState({
        error: error
    })
}

export default ErrorBoundary;