import React from "react";

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    fetchData = () => {

        const urls = [
            "https://jsonplaceholder.typicode.com/todos/1",
            "https://jsonplaceholder.typicode.com/todos/2",
            "https://jsonplaceholder.typicode.com/todos/3",
            "https://jsonplaceholder.typicode.com/todos/4",
            "https://jsonplaceholder.typicode.com/todos/5",
            "https://jsonplaceholder.typicode.com/todos/6",
            "https://jsonplaceholder.typicode.com/todos/7",
            "https://jsonplaceholder.typicode.com/todos/8"
        ];

        const allRequests = urls.map(url =>
            fetch(url).then(response => response.json())
        );

        return Promise.all(allRequests);
    };

    componentDidMount() {
        this.fetchData().then(arrayOfResponses =>
            console.log("Data", arrayOfResponses)
        );
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

Test.propTypes = {

};

export default Test;