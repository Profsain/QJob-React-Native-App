import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl

} from "react-native"
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { useCallback, useState } from "react"

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn } from "../../components"
import { COLORS, icons, SIZES } from "../../constants"
import useFetch  from "../../hook/useFetch"

const JobDetails = () => {
    const params = useGlobalSearchParams(); // get the id from the url
    const router = useRouter(); // get the router object

    // fetch the job details
    const { data, isLoading, error, refetch } = useFetch('job-details', { job_id: params.id });

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen
              options={{
                  headerStyle: {
                        backgroundColor: COLORS.lightWhite,
                  },
                  headerShadowVisible: false,
                  headerBackVisible: false,
                  headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                  ),
                  headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                  ),
                    headerTitle: ""
              }}
          >
              <>
                  <ScrollView showsHorizontalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refetch} color={COLORS.primary} />}>
                      {isLoading ? (
                          <ActivityIndicator size="large" color={COLORS.primary} />
                      ) : error ? (
                          <Text>Something went wrong</Text>
                      ) : data.length === 0 ? (
                          <Text>No data found</Text>
                      ) : (
                          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />

                            <JobTabs />          
                          </View>
                      )}
                  </ScrollView>
              </>
          </Stack.Screen>
    </SafeAreaView>
  )
}

export default JobDetails