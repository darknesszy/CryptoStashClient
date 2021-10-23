#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
// CHANGE: @react-native-community/push-notification-ios
#import <UserNotifications/UNUserNotificationCenter.h>
// END CHANGE: @react-native-community/push-notification-ios

// CHANGE: @react-native-community/push-notification-ios (, UNUserNotificationCenterDelegate)
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
// END CHANGE: @react-native-community/push-notification-ios

@property (nonatomic, strong) UIWindow *window;

@end
