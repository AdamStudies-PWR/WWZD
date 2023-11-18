import React, { Component } from 'react';

class Spinner extends Component<any, {data:string[]}>
{
    name: string;

    constructor(props: any)
    {
        super(props)

        this.name = this.props.name;
        this.state = {
            data: this.props.data
        };
    }

    updateData(data:string[])
    {
        this.setState({data: data})
    }

    render(): React.ReactNode
    {
        return (
            <label>
                {this.name}&nbsp;
                <select onChange={this.props.onChange}>
                    {this.state.data.map((element:string) => (
                        <option value={element}> {element} </option>
                    ))}
                </select>
            </label>);
    }
}

export default Spinner;
