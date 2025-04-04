import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface AuthUser {
  email: string;
}

interface AppContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);

  const validUsers = [
    { email: "hemanth@gmail.com", password: "hemanth" },
    { email: "pavan@gmail.com", password: "pavan" },
    { email: "venkatesh@gmail.com", password: "venkatesh" },
    { email: "bhaskar@gmail.com", password: "bhaskar" },
  ];

  const loadTasks = async (userEmail: string) => {
    const storedTasks = await AsyncStorage.getItem(`tasks_${userEmail}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
    }
  };

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem(`tasks_${user.email}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = validUsers.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      setUser({ email });
      await loadTasks(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
  };

  const addTask = (title: string) => {
    if (!user) return;
    const newTasks = [...tasks, { id: Date.now(), title, completed: false }];
    setTasks(newTasks);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <AppContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
