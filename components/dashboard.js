import { View, Text, Button, StyleSheet } from "react-native"

Dashboard = ({navigation}) =>{

    
    return(
        <View style={styles.container}>
            
            <View style={styles.tombol}>
            <Button 
                title="Peta" 
                onPress={() => navigation.navigate('Peta')}
            />
            </View>
            
        </View>
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
    
})
export default Dashboard;