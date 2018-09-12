import React, { Component } from 'react';
import uniqid from 'uniqid';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: 'abc',
            isEdit: false,
            editedItem: {
                id: '',
                title: ''
            },
            list: [
                {
                    id: uniqid(),
                    title: 'Some'
                },
                {
                    id: uniqid(),
                    title: 'Some 2'
                }
            ]
        }
    }

    addToList() {
        this.setState({
            list: [...this.state.list, this.state.inputText],
            inputText: ''
        })
    }

    changeInput(value) {
        this.setState({ inputText: value })
    }

    clearInput() {
        this.setState({ inputText: '' })
    }

    removeAllItems() {
        this.setState({ list: [] });
    }

    deleteItem(id) {
        console.log(id);
        const filtered = this.state.list.filter(el => el.id !== id);
        this.setState({ list: filtered });
    }

    editItem(el) {
        console.log(el);
        this.setState({ isEdit: true, editedItem: el });
    }

    changeEditedInput(value) {
        this.setState({
            editedItem: {
                ...this.state.editedItem,
                title: value
            }
        });
    }

    saveEditedItem() {
        const id = this.state.editedItem.id;
        const index = this.state.list.findIndex(el => el.id === id);
        const newList = this.state.list;
        newList[index] = this.state.editedItem;

        this.setState({
            list: newList,
            editedItem: {},
            isEdit: false
        });
    }

    editForm() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.editedItem.title}
                    onChange={(e) => this.changeEditedInput(e.target.value)}
                />
                <button onClick={() => this.saveEditedItem()}>Save</button>
            </div>
        );
    }

    render() {
        console.log(this.state);
        return (
            <div>

                <input
                    type="text"
                    value={this.state.inputText}
                    onChange={(e) => this.changeInput(e.target.value)}
                />

                <button onClick={() => this.clearInput()}>Clear input</button>
                <button onClick={() => this.addToList()}>Add to list</button>
                <button onClick={() => this.removeAllItems()}>Remove all items</button>

                <ul>
                    {this.state.list.map(el =>
                        <li key={el.id}>
                            {el.title}
                            <button onClick={() => this.deleteItem(el.id)}>Delete</button>
                            <button onClick={() => this.editItem(el)}>Edit</button>
                        </li>
                    )}
                </ul>

                {this.state.isEdit && this.editForm()}

            </div>
        );
    }
}

export default App;