import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopulerJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';
import { useState } from 'react';

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,  // Pagination, if necessary
  });

  const [selectedJob, setSelectedJob] = useState()

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          // Show the detailed error message
          <Text style={{ color: COLORS.red }}>Something went wrong: {error}</Text>
        ) : (
          <FlatList
            data={data}  // Pass data directly to FlatList
            renderItem={({ item }) => <PopulerJobCard
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />}
            keyExtractor={(item) => item?.job_id?.toString()}  // Ensure unique key
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
