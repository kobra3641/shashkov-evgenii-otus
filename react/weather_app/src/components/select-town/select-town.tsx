import React, {Component} from 'react';
import "./select-town.css"
import ISelect from "../../interfaces/iselect";

class SelectTown extends Component<ISelect> {

    state = {
        town: this.props.town
    };

    towns = this.props.data.map(item => {
        const {id, town} = item;
        return (
            <option key={id} value={town}>{town}</option>
        )
    });

    setValue(value: string) {
        this.setState({
            town: value
        });
        this.props.onSelectChange(value);
    }

    componentDidMount() {
        this.setValue(this.props.data[0].town);
    }

    componentDidUpdate(prevProps: ISelect) {
        if (prevProps.town !== this.props.town) {
            this.setValue(this.props.town);
        }
    }

    onSelectChange = (event: any) => {
        this.setValue(event.target.value);
    };

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <select
                        onChange={this.onSelectChange}
                        className="form-control form-control-sm select"
                        value={this.state.town}>
                        {this.towns}
                    </select>
                </div>
            </div>
        )
    }
}

export default SelectTown