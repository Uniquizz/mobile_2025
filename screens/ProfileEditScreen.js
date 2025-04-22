import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'react-native-feather'; 
import PrimaryButton from '../components/PrimaryButton';

const ProfileEditScreen = ({
  fullName, setFullName,
  userEmail, setUserEmail,
  userPassword, setUserPassword,
  whatsappNumber, setWhatsappNumber,
  profileImage, handleSaveProfile
}) => {

  return (
    <View style={styles.container}>


      {/* Imagen de perfil */}
      <TouchableOpacity style={styles.avatar}>
        <Camera color="#fff" width={24} height={24} />
      </TouchableOpacity>

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={userEmail}
        onChangeText={setUserEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={userPassword}
        onChangeText={setUserPassword}
      />

      <Text style={styles.label}>WhatsApp</Text>
      <TextInput
        style={styles.input}
        placeholder="Número de WhatsApp"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={whatsappNumber}
        onChangeText={setWhatsappNumber}
      />

<PrimaryButton style={styles.btn} label="Guardar" onPress={handleSaveProfile} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
   
    flex: 1,
  },

  avatar: {
    backgroundColor: '#333',
    borderRadius: 999,
    width: 90,
    height: 90,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    color: '#ccc',
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 18,
  },
  btn: {
    marginTop: 40,
    paddingTop:50
 
 
  },
});

export default ProfileEditScreen;
