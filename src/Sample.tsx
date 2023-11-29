import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native'

import { Colors, Header } from 'react-native/Libraries/NewAppScreen'

import * as Progress from 'react-native-progress'

function Section ({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'
  return (
  <View style={styles.sectionContainer}>
   <Text
    style={[
      styles.sectionTitle,
      {
        color: isDarkMode ? Colors.white : Colors.black
      }
    ]}
   >
    {title}
   </Text>
   <Text
    style={[
      styles.sectionDescription,
      {
        color: isDarkMode ? Colors.light : Colors.dark
      }
    ]}
   >
    {children}
   </Text>
  </View>
  )
}

function App (): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const [loading, setLoading] = useState(false)
  const [apiData, setApiData] = useState(null)
  const [error, setError] = useState(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  const handleButtonPress = () => {
  // Show the loading indicator
    setLoading(true)

    // Make an API call (replace with your API endpoint)
    // Make an API call
    fetch('https://v2.jokeapi.dev/joke/Programming')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return await response.json()
      })
      .then((data) => {
        // Hide the loading indicator
        setLoading(false)
        console.log(data)
        // Set the API data in the state
        setApiData(data)
      })
      .catch(() => {
        // Hide the loading indicator and handle the error
        setLoading(false)
        setError(true)
      })
  }

  return (
  <SafeAreaView style={backgroundStyle}>
   <StatusBar
    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    backgroundColor={backgroundStyle.backgroundColor}
   />
   <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={backgroundStyle}
   >
    <Header />
    <View
     style={{
       backgroundColor: isDarkMode ? Colors.black : Colors.white
     }}
    >
     <Section title="Step One">
      Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen
      and then come back to see your edits.
     </Section>
     <Button
      title="Start Functionality"
      onPress={handleButtonPress}
      disabled={loading}
     />
     <Progress.Bar
       indeterminate={true}
       width={200}
       color={isDarkMode ? 'white' : 'black'}
      />
     {error && <Text>Error: {error}</Text>}
     {apiData !== null && <Text>API Data: {JSON.stringify(apiData)}</Text>}
    </View>
   </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  }
})

export default App
