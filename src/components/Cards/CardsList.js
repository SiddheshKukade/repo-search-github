import { Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import RepoCard from "./RepoCard";

const CardsList = ({ route }) => {
  let repoList = [];
  repoList = route.params.searchResults;
  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar style="auto" />
      {repoList ? (
        repoList.map((repo) => (
          <RepoCard
            key={repo.id}
            browseUrl={repo.html_url}
            avatar={repo.owner.avatar_url}
            desc={repo.description}
            name={repo.name}
            language_url={repo.languages_url}
            stars={repo.stargazers_count}
            watchers={repo.subscribers_count}
            score={repo.score}
            created_at={repo.created_at}
            languagesList
          />
        ))
      ) : (
        <Text>Repo Not Found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
export default CardsList;
