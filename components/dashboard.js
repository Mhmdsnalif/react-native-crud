import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "./color";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import places from "./places";
const { width } = Dimensions.get("screen");

const Dashboard = ({ navigation }) => {
  // catergories
  const categoryIcons = [
    <MaterialIcons name="flight" size={25} color={COLORS.primary} />,
    <MaterialIcons name="beach-access" size={25} color={COLORS.primary} />,
    <MaterialIcons name="near-me" size={25} color={COLORS.primary} />,
    <MaterialIcons name="place" size={25} color={COLORS.primary} />,
  ];
  const ListCategory = () => {
    return (
      <View style={style.categories}>
        {/* {categoryIcons.map(()=>(<View></View>))} */}
        {categoryIcons.map((icon, index) => {
          return (
            <View key={index} style={style.iconContainer}>
              {icon}
            </View>
          );
        })}
      </View>
    );
  };
  // placesCard
  const Card = ({ place }) => {
    // console.log(place)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Details",  place );
        }}
      >
        <ImageBackground style={style.cardImage} source={place.image}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EvilIcons name="location" size={20} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {place.location}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="staro" size={20} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecomCard = ({ place }) => {
    return (
      <ImageBackground style={style.rmCardImage} source={place.image}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {place.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View style={{ flexDirection: "row", width: "100%", marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EvilIcons name="location" size={22} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {place.location}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 15,
              }}
            >
              <AntDesign name="staro" size={22} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 7 }}>5.0</Text>
            </View>
          </View>
          <Text style={{ color: COLORS.white, fontSize: 13 }}>
            {place.details}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <MaterialIcons name="sort" size={28} color={COLORS.white} />
        <Ionicons name="notifications-outline" size={28} color={COLORS.white} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{ color: COLORS.white, fontWeight: "bold", fontSize: 23 }}
            >
              Explore the in the
            </Text>
            <Text
              style={{ color: COLORS.white, fontWeight: "bold", fontSize: 23 }}
            >
              beautiful places
            </Text>
            <View style={style.inputContainer}>
              <MaterialIcons name="search" size={28} color={COLORS.dark} />
              <TextInput
                placeholder="Search place"
                style={{ color: COLORS.grey, fontSize: 19, paddingLeft: 10 }}
              />
            </View>
          </View>
        </View>
        <ListCategory />
        <Text style={style.sectionTitle}>Places</Text>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20, marginBottom: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
            
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => <RecomCard place={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  inputContainer: {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.white,
    // backgroundColor: COLORS.red,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
  },
  categories: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sectionTitle: {
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
    // backgroundColor:COLORS.red
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    overflow: "hidden",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
});
export default Dashboard;
