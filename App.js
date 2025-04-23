import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Modal,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated
} from 'react-native';
// Import icons correctly - make sure react-native-feather is installed
// If you're using Expo, you might want to use @expo/vector-icons instead
import * as Icon from 'react-native-feather';
// Styles
//////colors
import colors from './styles/colors';



// Data
import allQuizData from './data/quizData';
import blogEntries from './data/blogEntries';
import universities from './data/universities';
import categories from './data/categories';
import { questionCountOptions, subjectIcons } from './data/constants';



// Components
import PrimaryButton from './components/PrimaryButton';
import Header from './components/molecules/Header';
import StreakModal from './components/modals/StreakModal';
import ConfirmExitModal from './components/modals/ConfirmExitModal';


// Screens
import HomeScreen from './screens/HomeScreen';
import QuizConfigScreen from './screens/QuizConfigScreen';
import QuizScreen from './screens/QuizScreen';
import ScoreScreen from './screens/ScoreScreen';
import SchoolSelectionScreen from './screens/SchoolSelectionScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileMenuModal from './components/modals/ProfileMenuModal';
import ProfileEditScreen from './screens/ProfileEditScreen';






// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}




// Get unique subjects from quiz data
const subjects = [...new Set(allQuizData.map(item => item.subject))];



// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');






// Main component
const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showUniversitySelection, setShowUniversitySelection] = useState(false);
  const [showQuizConfig, setShowQuizConfig] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [useGridLayout, setUseGridLayout] = useState(false);
  const [streak, setStreak] = useState(7);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);


  // Quiz configuration states
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(5);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizData, setQuizData] = useState([]);

  // New states for streak modal and profile menu
  const [streakModalVisible, setStreakModalVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Changed to false to show login flow
  const [userName, setUserName] = useState(''); // Default user name

  // Home screen states
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Ref for scroll view to measure content height
  const scrollViewRef = useRef(null);
  const contentRef = useRef(null);

  // Filter quiz data based on selected subject and question count
  const prepareQuizData = () => {
    let filteredData = [...allQuizData];

    if (selectedSubject) {
      filteredData = filteredData.filter(item => item.subject === selectedSubject);
    }

    filteredData.sort(() => Math.random() - 0.5);
    filteredData = filteredData.slice(0, selectedQuestionCount);

    if (filteredData.length === 0) {
      filteredData = allQuizData.slice(0, selectedQuestionCount);
    }

    setQuizData(filteredData);
  };

  const handleSaveProfile = () => {
    console.log('Perfil guardado:', {
      fullName,
      userEmail,
      userPassword,
      whatsappNumber,
      profileImage
    });
  
    // Aquí puedes guardar los datos a un backend, AsyncStorage, etc.
    setShowProfileEdit(false);
    setShowHomeScreen(true);
  };

  // Check if content needs grid layout
  useEffect(() => {
    if (showQuiz && quizData[currentQuestion]) {
      // Use grid layout for questions with images or when screen height is limited
      const shouldUseGrid = quizData[currentQuestion].hasImage || height < 700;

      // Use LayoutAnimation for smooth transition
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setUseGridLayout(shouldUseGrid);
    }
  }, [currentQuestion, showQuiz, height, quizData]);

  // Animation when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, [currentQuestion, showScore, showUniversitySelection, showQuizConfig, showLogin, showHomeScreen]);

  const startQuizJourney = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowHomeScreen(false);
      setShowUniversitySelection(true);

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);

    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowUniversitySelection(false);
      setShowQuizConfig(true);

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleStartQuiz = () => {
    prepareQuizData();

    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnsweredQuestions([]);

    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowQuizConfig(false);
      setShowQuiz(true);

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleAnswerOption = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === quizData[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: quizData[currentQuestion].question,
        selectedAnswer: option,
        correctAnswer: quizData[currentQuestion].correctAnswer,
        isCorrect,
        hasImage: quizData[currentQuestion].hasImage,
        imageUrl: quizData[currentQuestion].imageUrl,
        subject: quizData[currentQuestion].subject
      }
    ]);
  };

  const handleNextQuestion = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        if (!isAuthenticated) {
          setShowQuiz(false);
          setShowLogin(true);
        } else {
          setShowQuiz(false);
          setShowScore(true);
        }
      }

      // Reset animations for next screen
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleLogin = () => {
    // Simulate login process
    console.log('Login with:', email, password);

    // Set authenticated state
    setIsAuthenticated(true);
    setUserName(email.split('@')[0] || 'Karen'); // Use part of email as username

    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowLogin(false);
      setShowScore(true);

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);

    // Set authenticated state
    setIsAuthenticated(true);
    setUserName(`${provider}User`); // Example username

    // Simulate social login process
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowLogin(false);
      setShowScore(true);

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleLogout = () => {
    // Close profile menu
    setProfileMenuVisible(false);

    // Reset authentication state
    setIsAuthenticated(false);
    setUserName('Usuario');
    setEmail('');
    setPassword('');

    // Return to university selection
    restartQuiz();
  };

  const handleShowLoginFromProfile = () => {
    // Close profile menu
    setProfileMenuVisible(false);

    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Hide current screens
      setShowHomeScreen(false);
      setShowUniversitySelection(false);
      setShowQuizConfig(false);
      setShowQuiz(false);
      setShowScore(false);

      // Show login screen
      setShowLogin(true);

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const restartQuiz = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowScore(false);
      setShowQuiz(false);
      setShowLogin(false);
      setShowQuizConfig(false);
      setShowUniversitySelection(false);
      setShowHomeScreen(true);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setSelectedUniversity(null);
      setSelectedSubject(null);
      setAnsweredQuestions([]);

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleBackPress = () => {
    if (showQuiz) {
      setModalVisible(true);
    } else if (showQuizConfig) {
      // Go back to university selection
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setShowQuizConfig(false);
        setShowUniversitySelection(true);

        // Reset animations
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.95);

        // Animate in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        ]).start();
      });
    } else if (showUniversitySelection) {
      // Go back to home screen
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setShowUniversitySelection(false);
        setShowHomeScreen(true);

        // Reset animations
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.95);

        // Animate in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        ]).start();
      });
    } else if (showScore) {
      // Go back to home screen
      restartQuiz();
    } else if (showLogin) {
      // Go back to home screen
      restartQuiz();
    }
  };

  const handleConfirmExit = () => {
    setModalVisible(false);

    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowQuiz(false);
      setShowScore(true); // Show score/summary screen

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleCancelExit = () => {
    setModalVisible(false);
  };

  // Progress calculation
  const progress = quizData.length > 0 ? ((currentQuestion + 1) / quizData.length) * 100 : 0;

  // Helper function to render icons safely
  const renderIcon = (iconName, props) => {
    const IconComponent = Icon[iconName];
    if (IconComponent) {
      return <IconComponent {...props} />;
    }
    // Fallback for debugging
    console.log(`Icon not found: ${iconName}`);
    return <Text style={{ color: props.color || '#FFF' }}>⬅</Text>;
  };

  // Get subject color
  const getSubjectColor = (subject) => {
    const subjectLower = subject ? subject.toLowerCase() : '';
    return colors[subjectLower] || colors.primary;
  };

  // Get subject icon
  const getSubjectIcon = (subject) => {
    return subjectIcons[subject] || 'help-circle';
  };

  // Demo output
  console.log("UniQuiz-themed Dark Mode Quiz App is running!");
  if (showHomeScreen) {
    console.log("Showing home screen");
  } else if (showUniversitySelection) {
    console.log("Showing university selection screen");
  } else if (showQuizConfig) {
    console.log("Showing quiz configuration screen");
    console.log(`Selected question count: ${selectedQuestionCount}`);
    console.log(`Selected subject: ${selectedSubject || 'All subjects'}`);
  } else if (showQuiz) {
    console.log(`Current question: ${currentQuestion + 1}/${quizData.length}`);
    console.log("Quiz mode active, back button should be visible");
    console.log(`Using grid layout: ${useGridLayout}`);
  } else if (showLogin) {
    console.log("Showing login/register screen");
  } else if (showScore) {
    console.log(`Final score: ${score}/${answeredQuestions.length}`);
  }

  // Chunk array into groups of specified size
  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  };

  // Create university grid
  const universityGrid = chunkArray(universities, 2);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <Header
        showBack={showQuiz || showQuizConfig || showUniversitySelection || showScore || showLogin || showProfileEdit}
        onBackPress={handleBackPress}
        showMenu={showHomeScreen}
        onMenuPress={() => setProfileMenuVisible(true)}
        title={
          showHomeScreen ? '' :
            showUniversitySelection ? 'Selecciona Universidad' :
              showQuizConfig ? 'Configura tu Quiz' :
                showQuiz ? 'Uniquiz' :
                  showLogin ? 'Iniciar Sesión' :
                    showScore ? 'Resultados' :
                      showProfileEdit ? 'Editar Perfil' : 'Uniquiz'
        }
        userName={userName}
      />


      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <NavigationContainer>
          <RootStack></RootStack>
        </NavigationContainer> */}
        {/* Home Screen */}
        {showHomeScreen && (

          <HomeScreen
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={setSelectedCategory}
            blogEntry={
              blogEntries.find(entry =>
                selectedCategory === 'all' ? true : entry.categoryId === selectedCategory
              ) ?? blogEntries[0]
            }
            streak={streak}
            userName={userName}
            onStartQuiz={startQuizJourney}
            onStreakPress={() => setStreakModalVisible(true)}
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
          />

        )}



        {/* University Selection Screen */}
        {showUniversitySelection && (
          <SchoolSelectionScreen
            universities={universities}
            onSelectUniversity={handleUniversitySelect}
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
          />
        )}


        {/* Quiz Configuration Screen */}
        {showQuizConfig && (
          <QuizConfigScreen
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
            selectedUniversity={selectedUniversity}
            selectedQuestionCount={selectedQuestionCount}
            selectedSubject={selectedSubject}
            subjects={subjects}
            questionCountOptions={questionCountOptions}
            onSelectSubject={setSelectedSubject}
            onSelectQuestionCount={setSelectedQuestionCount}
            onStart={handleStartQuiz}
          />
        )}




        {/* Quiz Screen */}
        {showQuiz && quizData.length > 0 && (
          <QuizScreen
            currentQuestion={currentQuestion}
            quizData={quizData}
            selectedOption={selectedOption}
            isAnswered={isAnswered}
            handleAnswerOption={handleAnswerOption}
            handleNextQuestion={handleNextQuestion}
          />
        )}



        {/* Login Screen */}
        {showLogin && (
          <LoginScreen
            email={email}
            password={password}
            showPassword={showPassword}
            activeTab={activeTab}
            setEmail={setEmail}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            setActiveTab={setActiveTab}
            handleLogin={handleLogin}
            handleSocialLogin={handleSocialLogin}
            handleSkipLogin={() => {
              setIsAuthenticated(true);
              setUserName('Invitado');
              setShowLogin(false);
              setShowScore(true);
            }}
            renderIcon={renderIcon}
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
            onRegisterPress={() => {
              setShowLogin(false);       // Ocultamos la pantalla de login
              setShowProfileEdit(true);  // Mostramos la de editar perfil
            }}


          />
        )}





        {/* Score Screen */}
        {showScore && (
          <ScoreScreen
            score={score}
            total={answeredQuestions.length}
            streak={streak}
            answeredQuestions={answeredQuestions}
            selectedUniversity={selectedUniversity}
            onRestart={restartQuiz}
            onNewQuiz={() => {
              setShowScore(false);
              setShowUniversitySelection(true);
            }}
          />
        )}


        {/* Profile Edit */}
        {showProfileEdit && (
          <ProfileEditScreen
            onBack={handleBackPress}
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
            renderIcon={renderIcon}
            fullName={fullName}
            setFullName={setFullName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPassword={userPassword}
            setUserPassword={setUserPassword}
            whatsappNumber={whatsappNumber}
            setWhatsappNumber={setWhatsappNumber}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            profileImage={profileImage}
            handleSaveProfile={handleSaveProfile}
          />
        )}

      </ScrollView>

      {/* Modales */}
      <StreakModal
        visible={streakModalVisible}
        onClose={() => setStreakModalVisible(false)}
        streak={streak}
      />

      <ConfirmExitModal
        visible={modalVisible}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />


      <ProfileMenuModal
        visible={profileMenuVisible}
        onClose={() => setProfileMenuVisible(false)}
        userName={userName}
        onLogout={handleLogout}
        renderIcon={renderIcon}
      />






    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },








});

export default QuizApp;