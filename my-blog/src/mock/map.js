/* eslint-disable */
export default {
  track: {
    header: {
      'msg': 'success',
      'code': 0
    },
    body: [
    {
      'track': {
      'id': 1,
      'device_id': 'device_id_1',
      'total_duration': 19.0,
      'effective_duration': 17.0,
      'parking_duration': 2.0,
      'average_speed': 6.6720868110656735,
      'max_speed': 8.27415943145752,
      'collector_name': 'collector_name_1',
      'project_name': 'project_name_1',
      'start_location': '北京市海淀区海淀区马连洼铲铲香宜宾菜',
      'end_location': '北京市海淀区海淀区百望山红山口甲3号院北区东50米'
    },
    'points': [{
        'latitude': 40.020618489583335,
        'gps_time': 1589437141000,
        'point_type': 'normal',
        'id': 182,
        'longitude': 116.26861355251737
      },
      {
        'latitude': 40.0206201171875,
        'gps_time': 1589437142000,
        'point_type': 'normal',
        'id': 183,
        'longitude': 116.26852674696181
      },
      {
        'latitude': 40.020611707899306,
        'gps_time': 1589437143000,
        'point_type': 'normal',
        'id': 184,
        'longitude': 116.26843858506945
      },
      {
        'latitude': 40.020610080295135,
        'gps_time': 1589437144000,
        'point_type': 'over_speed',
        'id': 185,
        'longitude': 116.26834662543403
      },
      {
        'latitude': 40.02060682508681,
        'gps_time': 1589437145000,
        'point_type': 'over_speed',
        'id': 186,
        'longitude': 116.26826985677083
      },
      {
        'latitude': 40.020611707899306,
        'gps_time': 1589437146000,
        'point_type': 'over_speed',
        'id': 187,
        'longitude': 116.26819146050347
      },
      {
        'latitude': 40.02059977213542,
        'gps_time': 1589437147000,
        'point_type': 'normal',
        'id': 188,
        'longitude': 116.2681165907118
      },
      {
        'latitude': 40.02059136284722,
        'gps_time': 1589437148000,
        'point_type': 'normal',
        'id': 189,
        'longitude': 116.2680482313368
      },
      {
        'latitude': 40.02058648003472,
        'gps_time': 1589437149000,
        'point_type': 'normal',
        'id': 190,
        'longitude': 116.2679847547743
      },
      {
        'latitude': 40.02059136284722,
        'gps_time': 1589437150000,
        'point_type': 'over_speed',
        'id': 191,
        'longitude': 116.26791476779513
      },
      {
        'latitude': 40.02058322482639,
        'gps_time': 1589437151000,
        'point_type': 'fatigue',
        'id': 192,
        'longitude': 116.26783989800347
      },
      {
        'latitude': 40.02058485243055,
        'gps_time': 1589437152000,
        'point_type': 'fatigue',
        'id': 193,
        'longitude': 116.26775146484376
      },
      {
        'latitude': 40.02058322482639,
        'gps_time': 1589437153000,
        'point_type': 'fatigue',
        'id': 194,
        'longitude': 116.26765652126736
      },
      {
        'latitude': 40.0205712890625,
        'gps_time': 1589437154000,
        'point_type': 'fatigue',
        'id': 195,
        'longitude': 116.2675732421875
      },
      {
        'latitude': 40.02056125217014,
        'gps_time': 1589437155000,
        'point_type': 'fatigue',
        'id': 196,
        'longitude': 116.26749131944445
      },
      {
        'latitude': 40.02056613498264,
        'gps_time': 1589437156000,
        'point_type': 'sleep',
        'id': 197,
        'longitude': 116.26740125868055
      },
      {
        'latitude': 40.0205628797743,
        'gps_time': 1589437157000,
        'point_type': 'sleep',
        'id': 198,
        'longitude': 116.26731960720485
      },
      {
        'latitude': 40.02056125217014,
        'gps_time': 1589437158000,
        'point_type': 'sleep',
        'id': 199,
        'longitude': 116.26723958333334
      },
      {
        'latitude': 40.020557996961806,
        'gps_time': 1589437159000,
        'point_type': 'sleep',
        'id': 200,
        'longitude': 116.26716634114584
      },
      {
        'latitude': 40.02055121527778,
        'gps_time': 1589437160000,
        'point_type': 'sleep',
        'id': 201,
        'longitude': 116.2671044921875
      }
    ],
    'alarm_points': [{
        'id': 1,
        'track_id': 1.0,
        'alarm_type': 'sudden_deceleration_point',
        'duration': 0.0,
        'latitude': 40.02058648003472,
        'longitude': 116.2679847547743,
        'gps_time': 1589437149000,
        'img_url': '',
        'can_comment': true
      },
      {
        'id': 2,
        'track_id': 1.0,
        'alarm_type': 'stop_point',
        'duration': 4.0,
        'latitude': 40.0205628797743,
        'longitude': 116.2671044921875,
        'gps_time': 1589437160000,
        'img_url': '',
        'can_comment': true
      }, {
        'id': 3,
        'track_id': 1.0,
        'alarm_type': 'stop_point',
        'duration': 4.0,
        'latitude': 40.020618489583335,
        'longitude': 116.26861355251737,
        'gps_time': 1589437160000,
        'img_url': '',
        'can_comment': true
      }
    ]
  }],
  'error_msg': {},
  'page_msg': {}
},
channel:{
  header:{
    'msg': 'success',
    'code': 0,
  },
  'body': [{
      'id': 1,
      'create_time': 1588608000,
      'name': 'channel1'
    },
    {
      'id': 2,
      'create_time': 1588608000,
      'name': 'channel2'
    }
  ]

}
}