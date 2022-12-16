import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appbar, Searchbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, View, Text, Image, Linking } from "react-native";

const Home = ({ navigation }) => {
  const [language, setLanguage] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [orderByOption, setOrderbyOption] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const updateSearch = (q) => setQuery(q);
  const languages = ["C", "CSS", "HTML", "JS", "TS", "Python", "Java"];
  const sortOptions = ["stars", "score", "name", "created_at", "updated_at"];
  const orderByOptions = ["Ascending Order", "Descending Order"];

  async function getGithubRepo() {
    let URL = "";
    if (language != "") {
      URL = `https://api.github.com/search/repositories?q=${query}+language:${language}`;
      if (sortOption == "stars") {
        URL = `https://api.github.com/search/repositories?q=${query}+language:${language}&sort=stars`;
        if (orderByOption != "") {
          URL = `https://api.github.com/search/repositories?q=${query}+language:${language}&sort=${sortOption}&order=${orderByOption}`;
        }
      } else {
        if (orderByOption != "") {
          URL = `https://api.github.com/search/repositories?q=${query}+language:${language}&order=${orderByOption}`;
        }
      }
    } else {
      URL = `https://api.github.com/search/repositories?q=${query}`;
    }
    console.log("fianl URUL", URL);
    await fetch(URL, {
      headers: {
        Authorization:
          "Bearer <YOUR_AUTH_TOKEN>",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (sortOption != "starts" && sortOption != "") {
          sortSearchResults(responseJson.items);
        } else {
          setSearchResults(responseJson.items);
        }
        if (searchResults != []) {
          navigation.navigate("Repositories", { searchResults });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const sortSearchResults = (items) => {
    switch (sortOption) {
      case "watchers":
        items.sort((a, b) =>
          a.watchers_count > b.watchers_count
            ? 1
            : b.watchers_count > a.watchers_count
            ? -1
            : 0
        );
        break;
      case "score":
        items.sort((a, b) =>
          a.score > b.score ? 1 : b.score > a.score ? -1 : 0
        );
        break;
      case "name":
        items.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        break;
      case "created_at":
        items.sort((a, b) =>
          a.created_at > b.created_at ? 1 : b.created_at > a.created_at ? -1 : 0
        );
        break;
      case "updated_at":
        items.sort((a, b) =>
          a.updated_at > b.updated_at ? 1 : b.updated_at > a.updated_at ? -1 : 0
        );
        break;
      default:
        break;
    }
    setSearchResults(items);
    console.log("Search Results are switch case", searchResults.length);
  };
  const onPressCreator = () => {
    Linking.openURL("https://siddheshkukade.com/").catch((err) =>
      console.error("Error", err)
    );
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content
            title={
              <Text
                style={{ fontSize: 24, fontWeight: "700", letterSpacing: 2 }}
              >
                🐱‍💻 GitHub API 🔍
              </Text>
            }
            color="#6c757d"
            style={{ alignItems: "center" }}
          />
          <Appbar.Action
            icon="send"
            onPress={() => {
              getGithubRepo();
            }}
            color="#7c00f4"
          />
        </Appbar.Header>
        <StatusBar style="auto" />
        <View style={styles.container__content}>
          <Searchbar
            placeholder="ex. facebook/react"
            onChangeText={updateSearch}
            value={query}
          />

          <SelectDropdown
            data={languages}
            onSelect={(selectedItem, index) => {
              setLanguage(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            defaultButtonText="Select Programming Language "
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          {/* Sort by  */}
          <SelectDropdown
            data={sortOptions}
            onSelect={(selectedItem, index) => {
              setSortOption(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            defaultButtonText="Sorting Options "
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          {/* Order By  */}
          <SelectDropdown
            data={orderByOptions}
            onSelect={(selectedItem, index) => {
              if (selectedItem == "Ascending Order") {
                setOrderbyOption("asc");
              } else if (selectedItem == "Descending Order") {
                setOrderbyOption("desc");
              }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            defaultButtonText="Sorting Options "
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
        <View style={styles.bottom__heading}>
          <Text onPress={onPressCreator}>
            Made with ❤️ by{" "}
            <Text style={styles.bottom__heading__link}>SiddheshKukade</Text>{" "}
          </Text>
        </View>
      </View>
      <Image
        style={styles.bottom__heading__image}
        source={{
          uri: "https://dice.tech/static/media/logo.3856741b.png",
          width: 300,
          height: 100,
        }}
      />
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  container__heading__header: {
    height: "10%",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },

  container__heading: {},
  container__content: {
    marginTop: 15,
    // flex: 0.7,
    height: "60%",
    width: "95%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  bottom__heading__link: {
    fontStyle: "italic",
  },
  container__lang_select: {
    width: "90%",
    borderColor: "red",
  },
  bottom__heading: {
    alignItems: "center",
  },
  bottom__heading__image: {
    alignSelf: "center",
    paddingBottom: 50,
  },
  dropdown1BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginTop: 15,
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontWeight: "bold",
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});

export default Home;
