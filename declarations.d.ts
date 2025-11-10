// declarations.d.ts

// Define que a função openDatabase existe no módulo expo-sqlite
declare module 'expo-sqlite' {
  export function openDatabase(name: string): any;
}