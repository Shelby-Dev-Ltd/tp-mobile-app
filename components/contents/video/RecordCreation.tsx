import React, { useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import serviceJson from "../../../config/serviceAccount";
import { Constants } from "react-native-ui-lib";

type RecordCreationProps = {
  // mediaId: number,
  // user: Object,
  onSubmit: (location: string) => void;
};

const windowWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LAT = -6.284512;
const INITIAL_LNG = 107.170716;
const INITIAL_POSITION = {
  latitude: INITIAL_LAT,
  longitude: INITIAL_LNG,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

//for input autocomplete
type InputAutocompleteProps = {
  label: string;
  placeholder?: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}: InputAutocompleteProps) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: "AIzaSyAXkEQ11G_jDlMd1WHH6B58hu1UD9ohJv0",
          language: "id",
        }}
      />
    </>
  );
}

const RecordCreation: React.FC<RecordCreationProps> = ({ onSubmit }) => {
  const [inputLocation, setInputLocation] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const [results, setResults] = useState<any[]>([]);
//   const map = useRef<MapView | null>(null);

  const mapRef = useRef<MapView>(null); //new
  const [origin, setOrigin] = useState<LatLng | null>(); //new

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  }; //new

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  }; //new

  //new
  const onPlaceSelected = (
  details: GooglePlaceDetail | null,
  flag: "origin"
) => {
  if (flag === "origin" && details) {
    const position = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    setOrigin(position);
    moveTo(position);
  }
};

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
      </MapView>
      <View style={styles.searchContainer}>
        <Text style={styles.searchBoxLabel}>Input Location</Text>
        <InputAutocomplete
          placeholder="Search location..."
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
          
          label={""}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            onSubmit(inputLocation);
          }}
        >
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 60,
  },
  searchBoxField: {
    borderColor: "#777",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 18,
    marginBottom: 8,
  },
  searchBoxLabel: {
    fontSize: 16,
    marginBottom: -10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#26f",
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 18,
    color: "#fff",
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});
