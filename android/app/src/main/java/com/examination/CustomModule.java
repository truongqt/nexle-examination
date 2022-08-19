package com.myrncalculator;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class CustomModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT = "SHORT";
    private static final String DURATION_LONG = "LONG";

    CustomModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "ToastExp";
    }

    @ReactMethod
    public void show(String message, int duration){
        Toast.makeText(reactContext, message + ": " + String.valueOf(duration), duration).show();
    }

    @NonNull
    @Override
    public Map<String, Object> getConstants(){
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG, Toast.LENGTH_LONG);
        return constants;
    }
}