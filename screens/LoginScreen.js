import React from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import * as Icon from 'react-native-feather';
import colors from '../styles/colors';

const LoginScreen = ({
  email,
  password,
  confirmPassword,
  showPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  setShowPassword,
  activeTab,
  setActiveTab,
  handleLogin,
  handleSocialLogin,
  setIsAuthenticated,
  setUserName,
  setShowLogin,
  setShowScore,
  fadeAnim,
  scaleAnim,
  onRegisterPress,
  onLoginPress,
}) => {
  const renderIcon = (iconName, props) => {
    const IconComponent = Icon[iconName];
    return IconComponent ? <IconComponent {...props} /> : null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <View style={styles.loginContainer}>
            <View style={styles.loginContentWrapper}>
              <View style={styles.loginHeader}>
                <Text style={styles.loginTitle}>Bienvenido a UniQuiz</Text>
                <Text style={styles.loginSubtitle}>Inicia sesión para guardar tu progreso</Text>
              </View>

              {/* Login Tabs */}
              <View style={styles.loginTabs}>
                <TouchableOpacity
                  style={[styles.loginTab, activeTab === 'login' && styles.loginTabActive]}
                  onPress={() => setActiveTab('login')}
                >
                  <Text style={[styles.loginTabText, activeTab === 'login' && styles.loginTabTextActive]}>
                    Iniciar Sesión
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.loginTab, activeTab === 'register' && styles.loginTabActive]}
                  onPress={() => setActiveTab('register')}
                >
                  <Text style={[styles.loginTabText, activeTab === 'register' && styles.loginTabTextActive]}>
                    Registrarse
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Form */}
              <View style={styles.loginForm}>
                {/* Email */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      {renderIcon('mail', { width: 20, height: 20, color: colors.textSecondary })}
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Correo electrónico"
                      placeholderTextColor={colors.textTertiary}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      textContentType="emailAddress"
                      autoComplete="email"
                      importantForAutofill="yes"
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      {renderIcon('lock', { width: 20, height: 20, color: colors.textSecondary })}
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Contraseña"
                      placeholderTextColor={colors.textTertiary}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      textContentType="newPassword"
                      autoComplete="password"
                      importantForAutofill="yes"
                    />
                    <TouchableOpacity
                      style={styles.passwordToggle}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {renderIcon(showPassword ? 'eye-off' : 'eye', {
                        width: 20,
                        height: 20,
                        color: colors.textSecondary,
                      })}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password */}
                {activeTab === 'register' && (
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputIcon}>
                        {renderIcon('lock', { width: 20, height: 20, color: colors.textSecondary })}
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Confirmar contraseña"
                        placeholderTextColor={colors.textTertiary}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showPassword}
                        textContentType="newPassword"
                        autoComplete="password-new"
                        importantForAutofill="yes"
                      />
                      <TouchableOpacity
                        style={styles.passwordToggle}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        {renderIcon(showPassword ? 'eye-off' : 'eye', {
                          width: 20,
                          height: 20,
                          color: colors.textSecondary,
                        })}
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* Forgot Password */}
                {activeTab === 'login' && (
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                  </TouchableOpacity>
                )}

                {/* Login/Register Button */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={activeTab === 'login' ? handleLogin : onRegisterPress}
                >
                  <Text style={styles.loginButtonText}>
                    {activeTab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Social Login */}
              <View style={styles.socialLoginContainer}>
                <View style={styles.socialDivider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>O continúa con</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => handleSocialLogin('Google')}
                  >
                    <View style={styles.socialIcon}>
                      {renderIcon('globe', { width: 20, height: 20, color: colors.textPrimary })}
                    </View>
                    <Text style={styles.socialButtonText}>Google</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Skip Login */}
              <TouchableOpacity
                style={styles.skipLoginButton}
                onPress={() => {
                  setIsAuthenticated(true);
                  setUserName('Invitado');
                  setShowLogin(false);
                  setShowScore(true);
                }}
              >
                <Text style={styles.skipLoginText}>Continuar como invitado</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginContainer: { width: '100%' },
  loginContentWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  loginHeader: { alignItems: 'center', marginBottom: 30 },
  loginTitle: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 10 },
  loginSubtitle: { fontSize: 16, color: colors.textSecondary, textAlign: 'center' },
  loginTabs: { flexDirection: 'row', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
  loginTab: { flex: 1, paddingVertical: 15, alignItems: 'center' },
  loginTabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  loginTabText: { fontSize: 16, color: colors.textSecondary },
  loginTabTextActive: { color: colors.primary, fontWeight: 'bold' },
  loginForm: { marginBottom: 20 },
  inputWrapper: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  passwordToggle: { padding: 10 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { fontSize: 14, color: colors.accent },
  loginButton: {
    backgroundColor: colors.loginButtonBg,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginButtonText: { fontSize: 18, fontWeight: 'bold', color: colors.loginButtonText },
  socialLoginContainer: { marginBottom: 20 },
  socialDivider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { paddingHorizontal: 10, color: colors.textSecondary, fontSize: 14 },
  socialButtons: { flexDirection: 'row' },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  socialIcon: { marginRight: 10 },
  socialButtonText: { fontSize: 16, color: colors.textPrimary },
  skipLoginButton: { alignItems: 'center', paddingVertical: 15 },
  skipLoginText: { fontSize: 16, color: colors.textSecondary },
});

export default LoginScreen;
