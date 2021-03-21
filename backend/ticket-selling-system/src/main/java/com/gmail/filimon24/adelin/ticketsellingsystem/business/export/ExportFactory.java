package com.gmail.filimon24.adelin.ticketsellingsystem.business.export;

import javax.transaction.NotSupportedException;

public class ExportFactory {

    public static Exportable getExportableSoldTickets(ExportType type) throws NotSupportedException {
        switch (type) {
            case JSON:
                return new SoldTicketsJson();
            case CSV:
                return new SoldTicketsCsv();
            default:
                throw new NotSupportedException();
        }
    }
}
