import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import BaseModal from './BaseModal';
import colors from '../../styles/colors';

const ProfileMenuModal = ({
  visible,
  onClose,
  userName,
  onLogout,
  renderIcon,
}) => {
  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={styles.menu}>
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            {renderIcon('x', { width: 24, height: 24, color: colors.textPrimary })}
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100/2D2D2D/E94057?text=K' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>karen@example.com</Text>
        </View>

        <View style={styles.items}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.icon}>
              {renderIcon('user', { width: 20, height: 20, color: colors.textPrimary })}
            </View>
            <Text style={styles.text}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.icon}>
              {renderIcon('settings', { width: 20, height: 20, color: colors.textPrimary })}
            </View>
            <Text style={styles.text}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.icon}>
              {renderIcon('help-circle', { width: 20, height: 20, color: colors.textPrimary })}
            </View>
            <Text style={styles.text}>Ayuda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, styles.logout]} onPress={onLogout}>
            <View style={styles.icon}>
              {renderIcon('log-out', { width: 20, height: 20, color: colors.error })}
            </View>
            <Text style={[styles.text, { color: colors.error }]}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: '80%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 5,
  },
  info: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  items: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  logout: {
    borderBottomWidth: 0,
  },
});

export default ProfileMenuModal;
