package com.laferme;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "LaFerme";
  }

  /**
   * On app mount hook
   * @param savedInstanceState
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Display the generated splashscreen.xml drawable over our MainActivity
    RNBootSplash.init(R.drawable.splashscreen, MainActivity.this);
  }
}
