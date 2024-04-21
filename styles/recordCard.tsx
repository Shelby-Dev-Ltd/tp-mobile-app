import { StyleSheet } from "react-native";

export const recordCardStyles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13
  },
  headingContainer: {
    flexDirection: "row"
  },
  dateContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
    gap: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 25,
    paddingHorizontal: 5,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});