import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component {

    id = 3 // �̹� 0,1,2 �� �����ϹǷ� 3���� ����

    state = {
        input: '',
        todos: [
            { id: 0, text: 'A', checked: false },
            { id: 1, text: 'B', checked: true },
            { id: 2, text: 'C', checked: false }
        ]
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value // input �� ���� �ٲ� ��
        });
    }

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            input: '', // ��ǲ ����
            // concat �� ����Ͽ� �迭�� �߰�
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false
            })
        });
    }

    handleKeyPress = (e) => {
        // ������ Ű�� Enter �� handleCreate ȣ��
        if (e.key === 'Enter') {
            this.handleCreate();
        }
    }
    handleToggle = (id) => {
        const { todos } = this.state;

        // �Ķ���ͷ� ���� id �� ������ ���° ���������� ã���ϴ�.
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index]; // ������ ��ü

        const nextTodos = [...todos]; // �迭�� ����

        // ������ ������ �����ϰ�, checked ���� �����
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        });
    }
    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }

    render() {
        const { input, todos } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove
        } = this;

        return (
            <TodoListTemplate form={(
                <Form
                    value={input}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    onCreate={handleCreate}
                />
            )}>
                <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
            </TodoListTemplate>
        );
    }
}

export default App;