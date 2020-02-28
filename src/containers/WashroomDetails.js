import React, { Component } from 'react';
import { Typography, Icon } from 'antd';

const { Title } = Typography;

class WashroomDetails extends Component {
    state = {
        id: null
    }
    componentDidMount() {
        const { id } = this.props.match.params
        this.setState({ id: id });

    }
    render() {
        return (
            <>
                <Icon type="setting" className="icon-title" />
                <Title>Washroom Details {this.state.id}</Title>
            </>
        )
    }

}

export default WashroomDetails;