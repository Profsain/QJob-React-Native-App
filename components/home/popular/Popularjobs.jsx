import {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import {useRouter} from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter();
  
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  const [selectedJob, setSelectedJob] = useState("");

  const handleCardPress = (item) => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        
          ) : (
              <FlatList
                data={data.data}
                keyExtractor={(item) => item?.job_id}
                renderItem={({ item }) => (
                  <PopularJobCard
                    onPress={() => router.push(`/job-details/${item?.job_id}`)}
                    item={item}
                    selectedJob={selectedJob}
                    handleCardPress={handleCardPress}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{columnGap: SIZES.medium}}
              />
        )}
      </View>
    </View>
  )
}

export default Popularjobs