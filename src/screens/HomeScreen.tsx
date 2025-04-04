import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";
import { TextInput, Button, Card } from "react-native-paper";
import TaskItem from "../components/TaskItem";

export default function HomeScreen() {
  const { tasks, addTask, toggleTask, deleteTask } = useContext(AppContext)!;
  const [taskTitle, setTaskTitle] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Card style={styles.inputCard}>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              placeholder="Add a task..."
              value={taskTitle}
              onChangeText={setTaskTitle}
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={() => {
                if (taskTitle.trim()) {
                  addTask(taskTitle);
                  setTaskTitle("");
                }
              }}
            >
              Add
            </Button>
          </View>
        </Card>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            title={item.title}
            completed={item.completed}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f4f4f4",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputCard: {
    padding: 10,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
});
