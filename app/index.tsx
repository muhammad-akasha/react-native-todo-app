import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Todo() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (input.trim() !== "") {
      todo.unshift(input);
      setTodo([...todo]);
      setInput("");
    }
  };

  const updateTodo = (index: number) => {
    todo[index] = editValue;
    setTodo([...todo]);
    setIndex(0);
    setEditValue("");
    setModalVisible(false);
  };

  const deleteTodo = (index: number) => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <SafeAreaView>
        <TextInput
          style={styles.todoInp}
          onChangeText={setInput}
          value={input}
          placeholder="Enter your todo"
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.addBtn}
          onPress={addTodo}
        >
          <Text style={styles.text}>Add Todo</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {todo.length > 0 ? (
        <FlatList
          data={todo}
          renderItem={({ item, index }) => (
            <View style={[styles.todoContainer]}>
              <Text style={styles.todoText}>{item}</Text>
              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.editBtn}
                onPress={() => {
                  setEditValue(todo[index]);
                  setModalVisible(true);
                  setIndex(index);
                }}
              >
                <Text style={styles.text}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.deleteBtn}
                onPress={() => deleteTodo(index)}
              >
                <Text style={styles.text}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
          style={{ flexGrow: 1 }}
        />
      ) : (
        <Text>No Todo Found!</Text>
      )}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={[styles.todoInp, { width: "100%", marginBottom: 20 }]}
                onChangeText={setEditValue}
                value={editValue}
                placeholder="Enter Updated Todo"
              />
              <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => updateTodo(index)}
                >
                  <Text style={styles.text}>Update</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.text}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure the main container fills the screen
    alignItems: "center",
    marginTop: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 5,
    elevation: 5,
    textShadowColor: "#f3c3d3", // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 12, // Shadow blur radius
  },
  addBtn: {
    width: 320,
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 25,
    margin: "auto",
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
  todoInp: {
    padding: 7,
    width: 320,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    marginTop: 15,
  },
  todoContainer: {
    flex: 1, // Ensure the container can grow with content
    width: 320,
    paddingHorizontal: 15,
    shadowColor: "#000",
    backgroundColor: "#fff",
    gap: 6,
    paddingVertical: 25,
    shadowRadius: 7,
    elevation: 10,
  },

  todoText: {
    fontSize: 15,
    padding: 4,
    shadowColor: "#000",
    shadowRadius: 10,
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
    color: "#000",
    paddingHorizontal: 10,
    elevation: 20,
  },
  editBtn: {
    backgroundColor: "#15B392",
    padding: 4,
    marginTop: 5,
    borderRadius: 4,
  },
  deleteBtn: {
    backgroundColor: "#FF0000",
    padding: 4,
    marginTop: 5,
    borderRadius: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#03AED2",
  },
  buttonClose: {
    backgroundColor: "#7EA1FF",
  },
});
