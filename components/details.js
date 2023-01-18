import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import COLORS from "./color";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// import COLORS from '../consts/colors'

function Details({ navigation, route }) {
  const place = route.params;
  console.log(place);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7 }} source={place.image}>
        {console.log(place.image)}
        <View style={style.header}>
          <AntDesign
            name="left"
            size={28}
            color={COLORS.white}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <MaterialIcons name="more-vert" size={28} color={COLORS.white} />
        </View>
        <View style={style.imageDetails}>
          <Text
            style={{
              fontSize: 30,
              color: COLORS.white,
              marginBottom: 20,
              width: "70%",
              fontWeight: "bold",
            }}
          >
            {place.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="star" size={30} color={COLORS.orange} />
            <Text
              style={{ color: COLORS.white, fontSize: 20, paddingLeft: 10 }}
            >
              5.0
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <AntDesign name="heart" size={28} color={COLORS.red} />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <MaterialIcons name="location-on" size={28} color={COLORS.primary} />
          <Text
            style={{ color: COLORS.primary, fontSize: 20, fontWeight: "bold" }}
          >
            {place.location}
          </Text>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
          About the trip
        </Text>
        <Text style={{ marginTop: 20, lineHeight: 22 }}>{place.details}</Text>
      </View>
      <View style={style.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: COLORS.white }}
          >
            $200
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}>
            PER DAY
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={style.bookNow}>
            <Text style={{ fontWeight: "bold", color: COLORS.primary, fontSize:16 }}>
              Book Now
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
      bookNow:{
            backgroundColor:COLORS.white,
            height: 50,
            width: 150,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:10,
            
      },
  detailsContainer: {
    backgroundColor: COLORS.white,
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    borderRadius: 30,
    backgroundColor: COLORS.white,
    top: -30,
    right: 30,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
    alignItems:'center',
    height: 70,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
//     paddingVertical: 40,
    paddingHorizontal: 20,
  },
});

export default Details;
