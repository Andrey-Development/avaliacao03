import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3c3c3c",
    flex: 1,
    padding: 10,
  },
  divCards: {
    marginTop: 16,
    height: "85%",
  },
  card: {
    height: "fit-content",
    width: "fit-content",
    backgroundColor: "#2c2c2c",
    marginBottom: 12,
  },
  headerCard: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  bodyCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  titleCard: {
    fontSize: 18,
    color: "#A9A9A9",
  },
  labelCard: {
    color: "#A9A9A9",
    fontSize: 16,
  },
  textCard: {
    color: "#f1f1fa",
    fontSize: 16,
  },
  footerCard: {
    padding: 16,
  },
  btnFloat: {
    width: 50,
    height: 50,
    position: "absolute",
    right: 0,
    bottom: 0,
    borderRadius: 25,
    backgroundColor: "#229A00",
  },
  btnAddTask: {
    width: "100%",
    height: "100%",
    margin: "auto",
    fontSize: 50,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#c6c6c6",
    height: 45,
    fontSize: 17,
    marginBottom: 12,
  },
  divButtoms: {
    marginTop: 16,
    gap: 12,
  },
  button: {
    color: "#f1f1fa",
    backgroundColor: "#00cbcc",
    textAlign: "center",
    paddingVertical: 8,
    marginVertical: 12,
    borderRadius: 3,
  },
});

export default styles;
