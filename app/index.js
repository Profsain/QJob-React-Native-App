import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, images, icons, SIZES } from '../constants';
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, welcome} from '../components';

const Home = () => {
    const router = useRouter();
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen
              options={{
                  headerStyle: {
                        backgroundColor: COLORS.lightWhite,
                        elevation: 0,
                    }, 
              }}
          />
    </SafeAreaView>
  )
}

export default Home