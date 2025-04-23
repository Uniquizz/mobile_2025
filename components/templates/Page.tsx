import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

interface Props {
  children: React.ReactNode
}

const Page = ({children}: Props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
    >
      {children}
    </ScrollView>

  )
}

export default Page

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 140,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
})
