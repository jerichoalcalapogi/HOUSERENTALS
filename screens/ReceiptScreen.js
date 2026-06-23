import React, { useRef, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
<<<<<<< HEAD
=======
import * as MediaLibrary from "expo-media-library";
>>>>>>> 410b0891 (finals)
import { RentalsContext } from "../AppContext";

export default function ReceiptScreen({ route }) {
  const { house, renter } = route.params;

  const viewRef = useRef();
  const [loading, setLoading] = useState(false);

  const { addRental } = useContext(RentalsContext);

  const receiptNumber = renter?.receiptNumber || `RN${Date.now()}`;

<<<<<<< HEAD
=======
  // 🔥 ASK PERMISSION ON LOAD
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Allow access to save receipt in gallery"
        );
      }
    })();
  }, []);

>>>>>>> 410b0891 (finals)
  const saveReceipt = async () => {
    try {
      setLoading(true);

      if (!house || !renter) {
        Alert.alert("Error", "Missing data");
        return;
      }

      // 1. CAPTURE SCREEN
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 1,
      });

      // 2. SAVE TO GALLERY
      const asset = await MediaLibrary.createAssetAsync(uri);

<<<<<<< HEAD
      await addRental(house, renter);
=======
      // 3. CREATE ALBUM (optional but nice)
      await MediaLibrary.createAlbumAsync("House Receipts", asset, false);
>>>>>>> 410b0891 (finals)

      // 4. SHARE (optional)
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }

      // 5. SAVE TO APP STATE
      await addRental(house, renter);

      Alert.alert("Success", "Receipt saved to Gallery 🏠");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save receipt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* RECEIPT VIEW (THIS IS WHAT GETS SAVED) */}
      <View ref={viewRef} collapsable={false} style={styles.receipt}>
<<<<<<< HEAD
=======
        
>>>>>>> 410b0891 (finals)
        <View style={styles.topBar}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>RECEIPT</Text>
          </View>
          <Text style={styles.pageTitle}>House Rental Receipt</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusIcon}>✔</Text>
          <Text style={styles.statusTitle}>Confirmed</Text>
<<<<<<< HEAD
          <Text style={styles.statusSubtitle}>Your rental has been booked successfully</Text>
=======
          <Text style={styles.statusSubtitle}>
            Your rental has been booked successfully
          </Text>
>>>>>>> 410b0891 (finals)
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Receipt Number</Text>
          <Text style={styles.summaryValue}>{receiptNumber}</Text>
<<<<<<< HEAD
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>House</Text>
            <Text style={styles.summaryText}>{house?.name || "--"}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Rental Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location</Text>
          <Text style={styles.detailValue}>{house?.location || "--"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Rent</Text>
          <Text style={styles.detailValue}>{house?.price || "--"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bedrooms</Text>
          <Text style={styles.detailValue}>{house?.bedrooms || "--"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bathrooms</Text>
          <Text style={styles.detailValue}>{house?.bathrooms || "--"}</Text>
        </View>

        <Text style={styles.sectionLabel}>Guest Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>{renter?.fullName || "--"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{renter?.email || "--"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Contact</Text>
          <Text style={styles.detailValue}>{renter?.contactNumber || "--"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Move-in</Text>
          <Text style={styles.detailValue}>{renter?.moveInDate || "--"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>{renter?.rentalDuration || "--"}</Text>
        </View>

=======

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>House</Text>
            <Text style={styles.summaryText}>{house?.name || "--"}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Rental Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location</Text>
          <Text style={styles.detailValue}>{house?.location || "--"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Rent</Text>
          <Text style={styles.detailValue}>{house?.price || "--"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bedrooms</Text>
          <Text style={styles.detailValue}>{house?.bedrooms || "--"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bathrooms</Text>
          <Text style={styles.detailValue}>{house?.bathrooms || "--"}</Text>
        </View>

        <Text style={styles.sectionLabel}>Guest Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>{renter?.fullName || "--"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{renter?.email || "--"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Contact</Text>
          <Text style={styles.detailValue}>{renter?.contactNumber || "--"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Move-in</Text>
          <Text style={styles.detailValue}>{renter?.moveInDate || "--"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>{renter?.rentalDuration || "--"}</Text>
        </View>

>>>>>>> 410b0891 (finals)
        <Text style={styles.footer}>Powered by House Rental</Text>
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={saveReceipt}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Save to Gallery"}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}











/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0faf0",
    padding: 20,
  },

  receipt: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  badge: {
    backgroundColor: "#2E7D32",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#153d18",
  },

  statusBox: {
    backgroundColor: "#e5f6ea",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 16,
  },

  statusIcon: {
    fontSize: 28,
    color: "#2E7D32",
    marginBottom: 10,
  },

  statusTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 6,
  },

  statusSubtitle: {
    fontSize: 14,
    color: "#4b6c4f",
    textAlign: "center",
<<<<<<< HEAD
    lineHeight: 20,
=======
>>>>>>> 410b0891 (finals)
  },

  summaryCard: {
    backgroundColor: "#f4fbf4",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  summaryLabel: {
<<<<<<< HEAD
    color: "#4b6c4f",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
=======
    fontSize: 12,
    fontWeight: "700",
    color: "#4b6c4f",
>>>>>>> 410b0891 (finals)
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f4f1f",
    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summaryText: {
    color: "#4b6c4f",
    fontSize: 14,
    fontWeight: "600",
  },

  sectionLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f4f1f",
<<<<<<< HEAD
=======
    marginTop: 10,
>>>>>>> 410b0891 (finals)
    marginBottom: 10,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#dcf2db",
  },

  detailLabel: {
    color: "#4b6c4f",
    fontSize: 14,
    width: "45%",
  },

  detailValue: {
    color: "#1f3d1f",
    fontSize: 14,
    fontWeight: "600",
    width: "50%",
    textAlign: "right",
  },

  footer: {
    marginTop: 20,
    textAlign: "center",
    color: "#4b6c4f",
    fontSize: 13,
<<<<<<< HEAD
    lineHeight: 18,
=======
>>>>>>> 410b0891 (finals)
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});