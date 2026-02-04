import React, { useRef, useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ads = [
    { id: '1', image: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' },
    { id: '2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s' },
    { id: '3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgF2jB8Ni3TCaExbN20__46pSvf1pQhBAXQ&s' },
    { id: '4', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgF2jB8Ni3TCaExbN20__46pSvf1pQhBAXQ&s' },
    { id: '5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgF2jB8Ni3TCaExbN20__46pSvf1pQhBAXQ&s' },
];

const AdsSliderRectangle = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    // Auto-scroll every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex >= ads.length) nextIndex = 0;
            setActiveIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    // Update activeIndex on manual scroll
    const onMomentumScrollEnd = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(
            event.nativeEvent.contentOffset.x / slideSize
        );
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={ads}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.image }} style={styles.image} />
                )}
                onMomentumScrollEnd={onMomentumScrollEnd}
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                snapToInterval={width}
                decelerationRate="fast"
            />
            <View style={styles.dotsContainer}>
                {ads.map((_, idx) => (
                    <View
                        key={idx}
                        style={[
                            styles.dot,
                            activeIndex === idx && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 140,
        borderRadius: 20,
        borderWidth: 5,
        borderColor:'#fff',
        resizeMode: 'cover',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#bbb',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#3AB6FF',
        width: 12,
        height: 8,
        borderRadius: 4,
    },
});

export default AdsSliderRectangle;