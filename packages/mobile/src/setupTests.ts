/* eslint-disable no-undef */
import 'jest-styled-components/native'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
