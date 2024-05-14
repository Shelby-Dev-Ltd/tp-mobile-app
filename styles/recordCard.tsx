import { StyleSheet } from "react-native";

export const recordCardStyles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
    flex: 1
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
  },
  dateContainer: {
    flexDirection: "row",
    paddingLeft: 18,
    paddingTop: 10,
    gap: 10,
    position: "absolute",
    top: 110,
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 25,
    paddingHorizontal: 5,
    width: '100%',
    marginVertical: 10,
    height: 200,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});