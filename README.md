# Problem Statement

- Github API : https://developer.github.com/v3/search
- Create Search Field Queries list of `Public Repos`
- Fetch data for each repo and create Cards for it

  - Cards Contains

    - Avatar => [0].owner.avatar_url
    - Name of Repo => name
    - Description => description
    - language => languages_url (query from url) => return list of languages
    - Sort by DONE
    - Stars
      - ASC => https://api.github.com/search/repositories?q=SiddheshKukade+language:js&sort=stars&order=asc
      - DESC => https://api.github.com/search/repositories?q=SiddheshKukade+language:js&sort=stars&order=desc - Watchers_count
        ```js
         const myFunc = async () => {
        var ans = await fetch('https://api.github.com/search/repositories?q=react+language:js&sort=watchers&order=asc')
        .then(response => response.json())
        .then(json => json.items)
        ```

    console.log("Before")
    for (let i = 0; i < 5; i++) {
    console.log(ans[i].watchers);
    }
    ans.sort((a, b) => (a.watchers_count > b.watchers_count) ? 1 : ((b.watchers_count > a.watchers_count) ? -1 : 0));
    console.log("After")
    for (let i = 0; i < 5; i++) {
    console.log(ans[i].watchers);
    }
    };
    myFunc();

    ```

    -
    - , score => `score`
    - , name=> `name`
    - created_at => `created_at`
    - updated_at => `updated_at`
    ```

Additional Items :
Contributers list
last 5 commits
