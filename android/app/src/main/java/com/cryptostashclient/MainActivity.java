package com.cryptostashclient;

import com.facebook.react.ReactActivity;
// CHANGE: react-native-screens
import android.os.Bundle;
// END CHANGE: react-native-screens

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CryptoStashClient";
  }

  // CHANGE: react-native-screens
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // END CHANGE: react-native-screens
}
