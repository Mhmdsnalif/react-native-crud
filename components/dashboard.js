import { StyleSheet } from "react-native"
import { 
    NativeBaseProvider, 
    VStack, 
    Stack, 
    Text, 
    Input, 
    Icon, 
    ScrollView, Image, Box } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

Dashboard = ({navigation}) =>{

    
    return(
    <NativeBaseProvider>
        <VStack style={styles.container}>
              <Stack space={3} style={styles.contText}>
                <Text style={{
                  color: "#000",
                  fontWeight: 'bold',
                  fontSize: 24,
                  }}>
                  Explore The 
                </Text>
                <Text style={{
                  color: "#000",
                  fontWeight: 'bold',
                  fontSize: 24,
                  }}>
                  Beautiful Place 
                </Text>

                <Input 
                placeholder="Search" 
                variant="filled" 
                width="100%" 
                borderRadius="10" 
                py="1" px="2" 
                fontSize={15}
                marginTop={5}
                InputLeftElement={
                <Icon ml="2" size="6" color="gray.400" 
                as={<MaterialIcons name="search" />} />} />

                <Text style={{
                  color: "#000",
                  fontWeight: 'bold',
                  fontSize: 24,
                  marginTop: 35,
                  marginBottom: 15,
                  }}>
                  Top Destination
                </Text>

                <Stack style={styles.gambarku}>
                <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                    <Image source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} alt="Alternate Text" size="2xl" marginRight={15} borderRadius={15}/>
                    <Image source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} alt="Alternate Text" size="2xl" marginRight={15} borderRadius={15}/>
                    <Image source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} alt="Alternate Text" size="2xl" marginRight={15} borderRadius={15}/>
                    <Image source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} alt="Alternate Text" size="2xl" marginRight={15} borderRadius={15}/>
                <Box px="4" pt="4">
                    NativeBase
                </Box>
                </ScrollView>
                </Stack>
              </Stack>

              
        </VStack>
    </NativeBaseProvider>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    }, 
    contText: {
        flex: 1,
        marginTop: 50,
      }
    
})
export default Dashboard;