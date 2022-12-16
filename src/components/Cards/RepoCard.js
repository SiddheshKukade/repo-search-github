import { useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
export default function RepoCard({
  avatar,
  desc,
  name,
  language_url,
  stars,
  browseUrl,
  score,
  created_at,
}) {
  let createdDate = new Date(created_at);
  const year = createdDate.getFullYear();
  // console.log("lang", )
  let [languagesList, setLanguagesList] = useState([]);
  let [langString, setLangString] = useState("");
  async function getGithubRepo() {
    await fetch(language_url)
      .then((response) => response.json())
      .then((responseJson) => {
        setLanguagesList(Object.entries(responseJson));
        let items = [];
        items = Object.entries(responseJson);
        setLangString(items[1][0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getGithubRepo();
  const onPressRepo = () => {
    Linking.openURL(browseUrl).catch((err) => console.error("Error", err));
  };
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: avatar }} />
      <Card.Title subtitle={`${score} • ${year} • ${langString} `} />
      <Card.Content>
        <Title style={{ fontWeight: "bold" }}>{name}</Title>
        <Paragraph>{desc}</Paragraph>
        <Text style={styles.url} onPress={onPressRepo}>
          🔗{browseUrl}
        </Text>
        <Text> ⭐ {stars} </Text>
      </Card.Content>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  url: {
    color: "#0265d2",
  },
});
