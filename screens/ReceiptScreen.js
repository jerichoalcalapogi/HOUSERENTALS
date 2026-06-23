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
import * as MediaLibrary from "expo-media-library";
import { RentalsContext } from "../AppContext";

export default function ReceiptScreen({ route }) {
  const { house, renter } = route.params;

  const viewRef = useRef();
  const [loading, setLoading] = useState(false);

  const { addRental } = useContext(RentalsContext);

  const receiptNumber = renter?.receiptNumber || `RN${Date.now()}`;

  // Ask permission once
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

  const saveReceipt = async () => {
    try {
      setLoading(true);

      if (!house || !renter) {
        Alert.alert("Error", "Missing data");
        return;
      }

      // Capture receipt
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 1,
      });

      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(uri);

      // Create album (optional)
      await MediaLibrary.createAlbumAsync("House Receipts", asset, false);

      // Share (optional)
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }

      // Save to app state
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
      <View ref={viewRef} collapsable={false} style={styles.receipt}>
        
        <View style={styles.topBar}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>RECEIPT</Text>
          </View>
          <Text style={styles.pageTitle}>House Rental Receipt</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusIcon}>✔</Text>
          <Text style={styles.statusTitle}>Confirmed</Text>
          <Text style={styles.statusSubtitle}>
            Your rental has been booked successfully
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Receipt Number</Text>
          <Text style={styles.summaryValue}>{receiptNumber}</Text>

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

        <Text style={styles.footer}>Powered by House Rental</Text>
      </View>

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
    elevation: 8,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  badge: {
    backgroundColor: "#2E7D32",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
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
  },

  statusTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
  },

  statusSubtitle: {
    fontSize: 14,
    color: "#4b6c4f",
    textAlign: "center",
  },

  summaryCard: {
    backgroundColor: "#f4fbf4",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  summaryLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4b6c4f",
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f4f1f",
    marginBottom: 10,
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
    marginVertical: 10,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dcf2db",
  },

  detailLabel: {
    width: "45%",
    color: "#4b6c4f",
  },

  detailValue: {
    width: "50%",
    textAlign: "right",
    fontWeight: "600",
    color: "#1f3d1f",
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#4b6c4f",
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