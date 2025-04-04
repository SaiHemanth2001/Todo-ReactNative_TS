import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox, IconButton } from "react-native-paper";

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <Checkbox status={completed ? "checked" : "unchecked"} onPress={() => onToggle(id)} />
      <Text style={[styles.text, completed && styles.completed]}>{title}</Text>
      <IconButton icon="delete" size={20} onPress={() => onDelete(id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default TaskItem;
