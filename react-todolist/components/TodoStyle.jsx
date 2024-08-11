import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 80,
    shadowColor: "red",
    shadowRadius: 50,
    elevation: 5,
    borderRadius: 50,
    borderWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  img: {
    height: 35,
    width: 35,
  },
  title: {
    fontSize: 25,
  },
});
