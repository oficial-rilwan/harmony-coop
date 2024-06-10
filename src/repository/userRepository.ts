"use client";
import { toast } from "react-toastify";

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class UserRepository {
  static user = UserRepository.getUser();
  static collection = UserRepository.getDataFromStorage();

  static signup(data: UserProps) {
    for (let key in data) {
      if (!data[key as keyof UserProps]) {
        toast.error(`${key} is required`);
        return;
      }
    }
    let user = UserRepository.findOne({ email: data.email } as UserProps);
    if (user) {
      toast.error("User already exists. Please signin to continue");
      return;
    }

    data.id = UserRepository.generateID();
    UserRepository.collection.push(data);
    UserRepository.saveDateToStorage();

    return data;
  }

  static signin(data: UserProps) {
    for (let key in data) {
      if (!data[key as keyof UserProps]) {
        toast.error(`${key} is required`);
        return;
      }
    }
    let user = UserRepository.findOne({ email: data.email } as UserProps);
    if (!user) {
      toast.error("Invalid credentials. Please check your details and try again.");
      return;
    }
    if (user.password !== data.password) {
      toast.error("Invalid credentials. Please check your details and try again.");
      return;
    }

    return user;
  }

  static update(data: UserProps, userId: string) {
    for (let key in data) {
      if (!data[key as keyof UserProps]) return toast.error(`${key} is required`);
    }
    let user = UserRepository.findById(userId);
    if (!user) return toast.error("Request could not be completed. Invalid user ID");

    UserRepository.collection = UserRepository.collection.map((item) => {
      if (item.id === userId) return { ...item, ...data };
      return item;
    });
    UserRepository.saveDateToStorage();
  }

  static findById(id: string) {
    return UserRepository.collection.find((item) => item.id === id);
  }
  static findByEmail(email: string) {
    return UserRepository.collection.find((item) => item.email === email);
  }

  static findOne(query: UserProps) {
    return UserRepository.collection.find((item) => {
      for (let key in query) {
        if (!!query[key as keyof UserProps]) {
          return item[key as keyof UserProps].includes(query[key as keyof UserProps]);
        }
        return item;
      }
    });
  }

  static find(query: UserProps) {
    return UserRepository.collection.filter((item) => {
      for (let key in query) {
        if (!!query[key as keyof UserProps]) {
          return item[key as keyof UserProps].includes(query[key as keyof UserProps]);
        }
        return item;
      }
    });
  }
  static getUser() {
    let user = null as UserProps | null;
    if (typeof window !== "undefined") {
      let result = window?.localStorage?.getItem("user");
      if (result) user = JSON.parse(result);
    }
    return user;
  }

  static getDataFromStorage() {
    let users = [] as UserProps[];
    let result = window?.localStorage?.getItem("users");
    if (result) users = JSON.parse(result);
    return users;
  }

  static saveDateToStorage() {
    const users = JSON.stringify(UserRepository.collection);
    const data = JSON.stringify(localStorage.setItem("users", users));
    return data;
  }

  static generateID() {
    const id = new Date().getTime();
    return String(id);
  }
}

export default UserRepository;
