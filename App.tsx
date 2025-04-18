import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { observer } from '@legendapp/state/react';
import { addTodo, todos$ as _todos$, toggleDone, editTodo, deleteTodo } from './utils/SupaLegend';
import { Tables } from './utils/database.types';

// Emojis to decorate each todo.
const NOT_DONE_ICON = String.fromCodePoint(0x1f7e0);
const DONE_ICON = String.fromCodePoint(0x2705);

// The text input component to add a new todo.
const NewTodo = () => {
  const [text, setText] = useState('');
  const handleSubmitEditing = ({ nativeEvent: { text } }) => {
    setText('');
    addTodo(text);
  };
  return (
    <TextInput
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={handleSubmitEditing}
      placeholder="O que você quer fazer hoje?"
      style={styles.inputModern}
    />
  );
};

// A single todo component, either 'not done' or 'done': press to toggle.
const Todo = ({ todo }: { todo: Tables<'todos'> }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text || '');
  const handlePress = () => {
    toggleDone(todo.id);
  };
  const handleEdit = () => {
    setEditing(true);
  };
  const handleEditChange = (text: string) => {
    setEditText(text);
  };
  const handleEditSubmit = () => {
    if (editText.trim() !== '' && editText !== todo.text) {
      editTodo(todo.id, editText.trim());
    }
    setEditing(false);
  };
  const handleDelete = () => {
    deleteTodo(todo.id);
  };
  if (todo.deleted) return null;
  return (
    <TouchableOpacity
      key={todo.id}
      onPress={handlePress}
      style={[styles.todoCard, todo.done ? styles.done : null]}
      onLongPress={handleEdit}
    >
      {editing ? (
        <TextInput
          value={editText}
          onChangeText={handleEditChange}
          onBlur={handleEditSubmit}
          onSubmitEditing={handleEditSubmit}
          style={[styles.todoEditInput]}
          autoFocus
        />
      ) : (
        <Text style={styles.todoText} numberOfLines={2} ellipsizeMode="tail">
          {todo.done ? DONE_ICON : NOT_DONE_ICON} {todo.text}
        </Text>
      )}
      <TouchableOpacity onPress={handleEdit} style={styles.iconButton} accessibilityLabel="Editar todo">
        <Text style={styles.iconEdit}>✏️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.iconButton} accessibilityLabel="Deletar todo">
        <Text style={styles.iconDelete}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// A list component to show all the todos.
const Todos = observer(({ todos$ }: { todos$: typeof _todos$ }) => {
  // Get the todos from the state and subscribe to updates
  const todos = todos$.get();
  const renderItem = ({ item: todo }: { item: Tables<'todos'> }) => (
    <Todo todo={todo} />
  );
  if (todos)
    return (
      <FlatList
        data={Object.values(todos)}
        renderItem={renderItem}
        style={styles.todos}
      />
    );

  return <></>;
});

// A button component to delete all the todos, only shows when there are some.
const ClearTodos = observer(() => {
  const handleClear = () => {
    _todos$.forEach((todo, id) => {
      if (todo.done.get()) {
        deleteTodo(id);
      }
    });
  };
  return (
    <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
      <Text style={styles.clearButtonText}>Limpar tarefas concluídas</Text>
    </TouchableOpacity>
  );
});

// The main app.
const App = observer(() => {
  console.log('App renderizou');
  try {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>Lista de Tarefas (Local-First)</Text>
          <NewTodo />
          <Todos todos$={_todos$} />
          <ClearTodos />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  } catch (e) {
    console.error('Erro ao renderizar App:', e);
    return <Text style={{color: 'red'}}>Erro ao renderizar o app: {String(e)}</Text>;
  }
});

// Styles for the app.
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f8fa',
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1a202c',
    letterSpacing: 0.5,
  },
  inputModern: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  },
  todoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  todoText: {
    flex: 1,
    fontSize: 19,
    color: '#222',
    fontWeight: '500',
  },
  todoEditInput: {
    flex: 1,
    fontSize: 19,
    color: '#222',
    fontWeight: '500',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 8,
    marginRight: 10,
  },
  iconButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 7,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  iconEdit: {
    fontSize: 20,
    color: '#007aff',
  },
  iconDelete: {
    fontSize: 20,
    color: '#d00',
  },
  done: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  clearButton: {
    marginTop: 32,
    alignSelf: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    boxShadow: '0 2px 3px rgba(0,0,0,0.07)',
  },
  clearButtonText: {
    fontWeight: 'bold',
    color: '#d00',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default App;
