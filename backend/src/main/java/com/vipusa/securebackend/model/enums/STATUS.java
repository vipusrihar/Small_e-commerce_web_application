package com.vipusa.securebackend.model.enums;

import java.util.List;

public enum STATUS {
    STATUS_ORDERED,
    STATUS_ACCEPTED,
    STATUS_PACKING,
    STATUS_SHIPPED,
    STATUS_DELIVERED,
    STATUS_REJECTED,
    STATUS_CANCELLED;

    public static List<STATUS> processingStatuses() {
        return List.of(STATUS_ORDERED, STATUS_ACCEPTED, STATUS_PACKING, STATUS_SHIPPED);
    }

}
